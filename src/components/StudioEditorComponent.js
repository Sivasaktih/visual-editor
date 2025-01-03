import StudioEditor from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';

const exportProject = (editor) => {
  const html = editor.getHtml();
  const css = editor.getCss();
  const js = editor.getJs();
  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  downloadFile(html, 'index.html', 'text/html');
  downloadFile(css, 'style.css', 'text/css');
  downloadFile(js,'app.js','text/js');
};

export default function App() {
  return (
    <StudioEditor
      options={{
        plugins: [
          editor =>
            editor.onReady(() => {
              // Add Export button to the options panel
              editor.Panels.addButton('options', {
                id: 'export-code',             // Unique ID for the button
                className: 'btn-export',       // CSS class for styling (optional)
                label: 'Export',               // Button label displayed in the UI
                command: 'export-template',    // Command to execute when clicked
                attributes: { title: 'Export your project' }, // Tooltip on hover
              });

              // Add the export command
              editor.Commands.add('export-template', {
                run: () => exportProject(editor),
              });
            }),
        ],
        project: {
          default: {
            pages: [
              { name: 'Home', component: '<h1>Home page</h1>' },
              { name: 'About', component: '<h1>About page</h1>' },
            ],
          },
        },
      }}
    />
  );
}
