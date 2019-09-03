
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function getExtensionFileAbsolutePath(context, relativePath) {
	return path.join(context.extensionPath, relativePath);
}

function getWebViewContent(context, templatePath) {
    const resourcePath = getExtensionFileAbsolutePath(context, templatePath);
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    return html;
}

function activate(context) {

	let disposable = vscode.commands.registerCommand('extension.openTalker', function () {
		const panel = vscode.window.createWebviewPanel(
			'划水',
			'冒牌版',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden:true,
			}
		);
		panel.webview.html = getWebViewContent(context, 'src/vx/index.html');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
