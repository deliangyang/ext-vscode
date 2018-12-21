import { window, StatusBarItem, StatusBarAlignment, TextDocument } from 'vscode'

export default class WordCounter {

    private _statusBarItem: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);

    /**
     * updateWordCount
     */
    public updateWordCount() {
        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return ;
        }

        let doc = editor.document;
        if (doc.languageId === "markdown") {
            let wordCount = this._getWordCount(doc);

            this._statusBarItem.text = wordCount !== 1 ? `${wordCount} Words` : '1 Word';
            this._statusBarItem.show();
        }
        
    }

    public _getWordCount(doc: TextDocument): number {

        let docContent = doc.getText();

        // Parse out unwanted whitespace so the split is accurate
        docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
        docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        let wordCount = 0;
        if (docContent !== "") {
            wordCount = docContent.split(" ").length;
        }

        return wordCount;
    }

    dispose() {
        this._statusBarItem.dispose();
    }

}