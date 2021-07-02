document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section > code').forEach(code => {
        const copyButton = document.createElement('button');

        copyButton.innerText = 'Copy';

        copyButton.addEventListener('click', () => {
            const range = document.createRange();

            range.selectNode(code);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        });

        code.after(copyButton);
    });

    document.querySelectorAll('section > div').forEach(div => {
        const exportButton = document.createElement('button');

        exportButton.innerHTML = 'Export';

        exportButton.addEventListener('click', async () => {
            const code = div.parentElement.querySelector('code');
            const title = code.textContent.match(/\*\*([A-Za-z ]+)\*\*/)[1];
            const filename = `${title.replace(' ', '-').toLowerCase()}.png`;
            const link = document.createElement('a');

            link.download = filename;
            link.href = await window.htmlToImage.toPng(div);

            link.click();
        });

        div.after(exportButton);
    });
});
