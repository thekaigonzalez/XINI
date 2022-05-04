"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const documentSymbolProvider_1 = require("./docSymbolProvider.js");
const foldingRangeProvider_1 = require("./foldingRangeProvider.js")

function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider([
        { language: 'xini', pattern: '**/*.{xini,cfg,reg}' },
        { language: 'xini', scheme: 'untitled' },
    ], new documentSymbolProvider_1.xiniDocumentSymbolProvider()));

    context.subscriptions.push(vscode.languages.registerFoldingRangeProvider([
        { language: 'xini', pattern: '**/*.{xini,cfg,reg}' },
        { language: 'xini', scheme: 'untitled' },
    ], new foldingRangeProvider_1.xiniFoldingRangeProvider()));
}

exports.activate = activate;

function deactivate() {
}

exports.deactivate = deactivate;