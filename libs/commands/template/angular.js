"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "<%= appName %>": {
        "root": "",
        "sourceRoot": "<%= appName %>",
        "projectType": "application",
        "prefix": "com",
        "schematics": {
            "@schematics/angular:component": {
                "styleext": "less",
                "spec": false
            },
            "@schematics/angular:class": {
                "spec": false
            },
            "@schematics/angular:directive": {
                "spec": false
            },
            "@schematics/angular:guard": {
                "spec": false
            },
            "@schematics/angular:module": {
                "spec": false
            },
            "@schematics/angular:pipe": {
                "spec": false
            },
            "@schematics/angular:service": {
                "spec": false
            }
        },
        "architect": {
            "build": {
                "builder": "@angular-devkit/build-angular:browser",
                "options": {
                    "outputPath": "dist/<%= appName %>",
                    "index": "<%= appName %>/index.html",
                    "main": "<%= appName %>/main.ts",
                    "polyfills": "<%= appName %>/polyfills.ts",
                    "tsConfig": "<%= appName %>/tsconfig.app.json",
                    "assets": [
                        "<%= appName %>/favicon.ico",
                        "<%= appName %>/assets",
                        "<%= appName %>/manifest.json"
                    ],
                    "styles": [
                        "./node_modules/ng-zorro-antd/src/ng-zorro-antd.min.css",
                        "<%= appName %>/styles.less",
                        "./node_modules/nprogress/nprogress.css"
                    ],
                    "scripts": []
                },
                "configurations": {
                    "production": {
                        "fileReplacements": [
                            {
                                "replace": "<%= appName %>/environments/environment.ts",
                                "with": "<%= appName %>/environments/environment.prod.ts"
                            }
                        ],
                        "optimization": true,
                        "outputHashing": "all",
                        "sourceMap": false,
                        "extractCss": true,
                        "namedChunks": false,
                        "aot": true,
                        "extractLicenses": true,
                        "vendorChunk": false,
                        "buildOptimizer": true
                    },
                    "hmr": {
                        "fileReplacements": [
                            {
                                "replace": "<%= appName %>/environments/environment.ts",
                                "with": "<%= appName %>/environments/environment.hmr.ts"
                            }
                        ]
                    },
                    "inner": {
                        "fileReplacements": [
                            {
                                "replace": "<%= appName %>/environments/environment.ts",
                                "with": "<%= appName %>/environments/environment.inner.ts"
                            }
                        ],
                        "optimization": true,
                        "outputHashing": "all",
                        "sourceMap": false,
                        "extractCss": true,
                        "namedChunks": false,
                        "aot": true,
                        "extractLicenses": true,
                        "vendorChunk": false,
                        "buildOptimizer": true,
                        "serviceWorker": true
                    }
                }
            },
            "serve": {
                "builder": "@angular-devkit/build-angular:dev-server",
                "options": {
                    "browserTarget": "<%= appName %>:build"
                },
                "configurations": {
                    "production": {
                        "browserTarget": "<%= appName %>:build:production"
                    },
                    "inner": {
                        "browserTarget": "<%= appName %>:build:inner"
                    },
                    "hmr": {
                        "browserTarget": "<%= appName %>:build:hmr"
                    }
                }
            },
            "extract-i18n": {
                "builder": "@angular-devkit/build-angular:extract-i18n",
                "options": {
                    "browserTarget": "<%= appName %>:build"
                }
            },
            "test": {
                "builder": "@angular-devkit/build-angular:karma",
                "options": {
                    "main": "<%= appName %>/test.ts",
                    "polyfills": "<%= appName %>/polyfills.ts",
                    "tsConfig": "<%= appName %>/tsconfig.spec.json",
                    "karmaConfig": "<%= appName %>/karma.conf.js",
                    "styles": [
                        "styles.less"
                    ],
                    "scripts": [],
                    "assets": [
                        "<%= appName %>/favicon.ico",
                        "<%= appName %>/assets",
                        "<%= appName %>/manifest.json"
                    ]
                }
            },
            "lint": {
                "builder": "@angular-devkit/build-angular:tslint",
                "options": {
                    "tsConfig": [
                        "<%= appName %>/tsconfig.app.json",
                        "<%= appName %>/tsconfig.spec.json"
                    ],
                    "exclude": [
                        "**/node_modules/**"
                    ]
                }
            }
        }
    },
    "<%= appName %>-e2e": {
        "root": "e2e/",
        "projectType": "application",
        "architect": {
            "e2e": {
                "builder": "@angular-devkit/build-angular:protractor",
                "options": {
                    "protractorConfig": "e2e/protractor.conf.js",
                    "devServerTarget": "<%= appName %>:serve"
                }
            },
            "lint": {
                "builder": "@angular-devkit/build-angular:tslint",
                "options": {
                    "tsConfig": "e2e/tsconfig.e2e.json",
                    "exclude": [
                        "**/node_modules/**"
                    ]
                }
            }
        }
    }
};
