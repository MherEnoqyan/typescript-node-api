export default  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "required": [
        "method",
        "settings"
    ],
    "properties": {
        "method": {
            "type": "string",
            "enum": [
                "getSeats",
                "getSectors",
                "getCategories",
                "getLines"
            ]
        },
        "settings": {
            "type": "object",
            "maxProperties": 2,
            "required": [
                "filter",
                "fields"
            ],
            "properties": {
                "filter": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "field",
                            "value"
                        ],
                        "properties": {
                            "field": {
                                "type": "string",
                                "enum": [
                                    "id",
                                    "status",
                                    "event",
                                    "seat",
                                    "line",
                                    "category",
                                    "sector",
                                    "name",
                                    "about",
                                    "price",
                                    "color",
                                    "translate_x",
                                    "translate_y",
                                    "scale",
                                    "rotate"
                                ]
                            },
                            "value": {
                                "type": [
                                    "string",
                                    "number"
                                ]
                            }
                        }
                    }
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": [
                            "id",
                            "status",
                            "event",
                            "seat",
                            "line",
                            "category",
                            "sector",
                            "name",
                            "about",
                            "price",
                            "color",
                            "translate_x",
                            "translate_y",
                            "scale",
                            "rotate"
                        ]
                    }
                }
            }
        }
    }
};