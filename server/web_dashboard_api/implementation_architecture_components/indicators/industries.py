
industry_types = {
    "oil": [
        "Oil & Gas Equipment & Services",
        "Oil & Gas Integrated",
        "Oil & Gas E&P",
        "Oil & Gas Midstream",
        "Oil & Gas Refining & Marketing"
    ],
    "food": [
        "Packaged Foods",
        "Packaging & Containers",
        "Restaurants",
        "Beverages—Brewers",
        "Beverages—Non-Alcoholic",
        "Beverages—Wineries & Distilleries",
        "Food Distribution",
        "Agricultural Inputs",
        "Farm Products",
        "Grocery Stores",
        "Confectioners"
    ],
    "pharm": [
        "Tobacco",
        "Specialty Chemicals",
        "Pharmaceutical Retailers",
        "Medical Care Facilities",
        "Medical Devices",
        "Medical Distribution",
        "Medical Instruments & Supplies",
        "Drug Manufacturers—General",
        "Drug Manufacturers—Specialty & Generic",
        "Chemicals"
    ],
    "realEstate": [
        "REIT—Diversified",
        "REIT—Healthcare Facilities",
        "REIT—Hotel & Motel",
        "REIT—Industrial",
        "REIT—Office",
        "REIT—Residential",
        "REIT—Retail",
        "REIT—Specialty",
        "Railroads",
        "Real Estate Services",
        "Rental & Leasing Services",
        "Residential Construction",
        "Resorts & Casinos",
        "Lodging",
        "Building Materials",
        "Building Products & Equipment"
    ],
    "tech":[
        "Semiconductor Equipment & Materials",
        "Semiconductors",
        "Software—Application",
        "Software—Infrastructure",
        "Scientific & Technical Instruments",
        "Internet Content & Information",
        "Electronic Components",
        "Electronic Gaming & Multimedia",
        "Biotechnology",
        "Diagnostics & Research",
        "Consumer Electronics",
        "Computer Hardware",
        "Communication Equipment"
    ],
    "services":[
        "Personal Services",
        "Security & Protection Services",
        "Specialty Business Services",
        "Staffing & Employment Services",
        "Telecom Services",
        "Leisure",
        "Integrated Freight & Logistics",
        "Information Technology Services",
        "Industrial Distribution",
        "Entertainment"
    ],
    "util": [
        "Solar",
        "Utilities—Diversified",
        "Utilities—Independent Power Producers",
        "Utilities—Regulated Electric",
        "Utilities—Regulated Gas",
        "Utilities—Regulated Water",
        "Waste Management"
    ],
    "machinery": [
        "Specialty Industrial Machinery",
        "Farm & Heavy Construction Machinery",
        "Engineering & Construction",
        "Aerospace & Defense"
    ],
    "retail": [
        "Specialty Retail",
        "Internet Retail",
        "Home Improvement Retail",
        "Household & Personal Products",
        "Furnishings, Fixtures & Appliances",
        "Apparel Manufacturing",
        "Apparel Retail",
        "Discount Stores"
    ],
    "metals": [
        "Steel",
        "Gold",
        "Coper"
    ],
    "accessories": [
        "Tools & Accessories",
        "Luxury Goods",
        "Footwear & Accessories"
    ],
    "travel": [
        "Travel Services",
        "Trucking",
        "Auto & Truck Dealerships",
        "Auto Manufacturers",
        "Auto Parts",
        "Airlines"
    ],
    "insurance": [
        "Insurance Brokers",
        "Insurance—Diversified",
        "Insurance—Life",
        "Insurance—Property & Casualty",
        "Insurance—Reinsurance",
        "Insurance—Specialty",
        "Healthcare Plans"
    ],
    "banks": [
        "Banks—Diversified",
        "Banks—Regional",
        "Credit Services",
        "Capital Markets",
        "Consulting Services",
        "Financial Data & Stock Exchanges",
        "Asset Management",
        "Business Equipment & Supplies",
        "Advertising Agencies"
    ]
}

def get_industry_type_dict():
    industry_to_type = dict()
    for industry_type, industries in industry_types.items():
        for i in industries:
            industry_to_type[i] = industry_type
    return industry_to_type
