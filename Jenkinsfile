
/**
* @file Jenkinsfile
* @brief This file contains the definition of a Jenkins Pipeline and build process for this project
* @copyright (C)2022 Lutron Electronics Co., Inc.
*    All rights reserved.
*    The copyright notice above does not evidence any actual or intended publication of such
*    source code. This file and the information contained herein are confidential and proprietary
*    to Lutron Electronics Co., Inc. Unauthorized possession or use of this file or the
*    information contained herein is prohibited. No reproduction may be made of this file without
*    the express written permission of Lutron Electronics Co.,Inc.
*/
// @Library(['jenkins_pipeline_scripts@master', 'aws_deploy_pipeline@develop']) _

pipeline {
  agent any
  stages {
    stage("verify tooling") {
      steps {
        sh '''
          docker version
          docker info
          docker compose version 
          curl --version
          jq --version
        '''
      }
    }
    stage('Prune Docker data') {
      steps {
        sh 'docker system prune -a --volumes -f'
      }
    }
    stage('Start container') {
      steps {
        sh 'docker compose up -d --no-color --wait'
        sh 'docker compose ps'
      }
    }
    stage('Run tests against the container') {
      steps {
        sh 'curl http://localhost | jq'
      }
    }
  }
  post {
    always {
      sh 'docker compose down --remove-orphans -v'
      sh 'docker compose ps'
    }
  }

/*
   agent {
      kubernetes {
         yaml utility.devopsPodYaml(
            annotations: [
               'container.apparmor.security.beta.kubernetes.io/buildkitd': 'unconfined',
               'container.seccomp.security.alpha.kubernetes.io/buildkitd': 'unconfined',
            ],
            containers: [
               [
                  containerName: 'buildkitd',
                  imageName: 'lutron/buildkit:rootless-artifactory',
                  useImageEntrypoint: true,
                  args: ['--debug', '--oci-worker-no-process-sandbox'],
                  resources: [requests: [cpu: '4000m', memory: '4000Mi'], limits: [cpu: '4000m', memory: '4000Mi']],
               ],
               [
                  containerName: 'hadolint',
                  imageName: 'hadolint/hadolint:v2.8.0-alpine',
                  resources: [requests: [cpu: '500m', memory: '500Mi'], limits: [cpu: '500m', memory: '500Mi']],
               ],
               [
                  containerName: 'nodejs',
                  imageName: 'node:16.14.0',
                  resources: [requests: [cpu: '500m', memory: '500Mi'], limits: [cpu: '500m', memory: '500Mi']],
               ],
            ],
            jnlpResources: [requests: [cpu: '1000m', memory: '1024Mi'], limits: [cpu: '2000m', memory: '2048Mi']],
         )
      }
   }

   options {
      skipDefaultCheckout()
      buildDiscarder(logRotator(numToKeepStr: '5'))
      disableConcurrentBuilds()
      timeout(time: 30, unit: 'MINUTES')
   }

   environment {
      LOCAL_ARTIFACTORY_CREDENTIALS_ID = 'jenkins-local-artifactory-common-token'
      ARTIFACTORY_CREDENTIALS_ID = 'jenkins-devops-common'
      BUILD_DIR = 'ketrawebdashboard'
      SOURCE_DIR = 'ketrawebdashboard'
   }

   stages {
      stage('Checkout Source') {
         steps {
            script {
               utility.logAgent()
               deleteDir()
               dir(env.BUILD_DIR) {
                  echo "INFO: Cloning with ${sh(script: 'git --version', returnStdout: true)}"
                  env.GIT_COMMIT = checkout(scm).GIT_COMMIT
                  env.IMG_TAG = env.GIT_COMMIT
                  env.NOTIFY_BITBUCKET = 'true'
                  bitbucket.sendBuildStatusNotification()
               }
            }
         }
      }


      stage('Auto-Generate') {
         parallel {
            stage('Hadolint') {
               steps {
                  script {
                     utility.logAgent()
                     dir(env.BUILD_DIR) {
                        container('hadolint') {
                           sh(script: 'hadolint --verbose Dockerfile')
                        }
                     }
                  }
               }
            }
            stage('Node') {
               steps {
                  script {
                     utility.logAgent()
                     dir(env.BUILD_DIR) {
                        dir(env.SOURCE_DIR) {
                           container('nodejs') {
                              withEnv(["NPM_CONFIG_USERCONFIG=${pwd()}/artifactory.npmrc", 'HOME=/tmp']) {
                                 withCredentials([usernameColonPassword(credentialsId: env.ARTIFACTORY_CREDENTIALS_ID, variable: 'ARTIFACTORY_CREDS')]) {
                                    sh(label: 'Run linter', script:'''
                                          { export ARTIFACTORY_CREDS_ENCODED=$(echo -n "${ARTIFACTORY_CREDS}" | base64 --wrap=0) ;} 2> /dev/null
                                          npm ci
                                          npm run lint
                                    ''')

                                    // Remove the node_modules folder that was made in order to do linting.
                                    // This directory is going to be huge so stashing it isn't a good idea.
                                    sh 'rm -rf node_modules'
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }

      stage('Auto-Commit') {
         when {
            expression {
                  dir(env.BUILD_DIR) {
                     sh 'git add -A'
                     return sh(script: 'git diff-index --exit-code --quiet HEAD', returnStatus: true)
                  }
            }
         }
         steps {
            dir(env.BUILD_DIR) {
                  script {
                     utility.logAgent()
                     echo 'INFO: generated code change detected'
                     utility.commitChanges(credentialsId: utility.getScmCredentialsId(), inclusions: ['.py', '.ts', '.tsx', '.js', '.jsx'])
                     currentBuild.result = 'ABORTED'
                     error('generated code change detected')
                  }
            }
         }
      }
    
      stage('Build') {
         steps {
            script {
               utility.logAgent()
               dir(env.BUILD_DIR) {
                  container('buildkitd') {
                     withCredentials([
                        usernamePassword(credentialsId: env.LOCAL_ARTIFACTORY_CREDENTIALS_ID, usernameVariable: 'LOCAL_ARTIFACTORY_CREDS_USR', passwordVariable: 'LOCAL_ARTIFACTORY_CREDS_PSW'),
                        usernamePassword(credentialsId: env.ARTIFACTORY_CREDENTIALS_ID, usernameVariable: 'ARTIFACTORY_CREDS_USR', passwordVariable: 'ARTIFACTORY_CREDS_PSW'),
                        usernameColonPassword(credentialsId: env.ARTIFACTORY_CREDENTIALS_ID, variable: 'ARTIFACTORY_CREDS'),
                     ]) {
                        sh (script: '''
                           buildctl build \
                              --frontend dockerfile.v0 \
                              --secret id=artifactory-creds,env=ARTIFACTORY_CREDS \
                              --local context=. \
                              --local dockerfile=. \
                              --opt build-arg:DOCKER_REGISTRY=artifactory.intra.lutron.com:443/cloudbees-docker-prod \
                              --output type=local,dest=out
                        ''')
                        dir('out') {
                           archiveArtifacts artifacts: '**'
                        }
                     }
                  }
               }
            }
         }
         post {
            always {
               script {
                  dir(env.BUILD_DIR) {
                     String logs = containerLog(name: 'buildkitd', returnLog: true)
                     writeFile file: 'buildkitd.log', text: logs
                     archiveArtifacts artifacts: 'buildkitd.log'
                  }
               }
            }
         }
      }
   }
   post {
      always {
         script {
            stage('Notify Bitbucket') {
               bitbucket.sendBuildCompleteNotification()
            }
         }
      }
   }*/
}
