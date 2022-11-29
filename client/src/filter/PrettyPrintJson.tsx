import React, { Component } from "react";

export default class PrettyPrintJson extends React.Component<{data: any}> {

    render() {
        // data could be a prop for example
        // eslint-disable-next-line react/prop-types
        return (<div><pre>{JSON.stringify(this.props.data, null, 2) }</pre></div>);
    }
}