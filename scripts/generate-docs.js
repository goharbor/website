import * as fsPromises from "fs/promises";
import * as yaml from "yaml";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const HEADER = `---
title: CLI Reference  
weight: 50
---
The Harbor CLI provides comprehensive access to key Harbor functionalities. With this tool, you can perform the following operations:
- **Projects**: Create, update, delete, and list projects.
- **Registry**: Configure settings, monitor status, and manage operations.
- **Repositories**: Create, update, delete, and list repositories.
- **Users**: Add, update, delete, and list user accounts.
- **Artifacts**: Upload, download, delete, and list artifacts.
This tool enables efficient and streamlined management of Harbor's core components directly from the command line.
`;

const FOOTER = '';

const GITHUB_API_URL = "https://api.github.com/repos/karanngi/harbor-cli/contents/docs";
const OUTPUT_PATH = `${__dirname}/../docs/cli/docs/_index.md`;

async function fetchYamlDocuments() {
    const response = await fetch(GITHUB_API_URL);
    const files = await response.json();

    const yamlDocuments = await Promise.all(files.map(async (file) => {
        if (!file.download_url) return null;

        const yamlResponse = await fetch(file.download_url);
        const yamlText = await yamlResponse.text();
        return yaml.parse(yamlText);
    }));

    return yamlDocuments.filter(Boolean);
}

function formatFlagAsTableRow(flag) {
    const { name, shorthand, usage } = flag;
    const longFlag = `\`--${name}\``;
    const shortFlag = shorthand ? `\`-${shorthand}\`` : "";
    const description = usage || "";

    return `| ${longFlag} | ${shortFlag} | ${description} |\n`;
}

function convertYamlToMarkdown(documents) {
    return documents.map((doc) => {
        let markdown = `## ${doc.name}\n${doc.synopsis}\n\n`;

        const usage = doc.usage || `${doc.name} [flags]`;
        markdown += "```shell\n" + usage + "\n```\n\n";

        markdown += "__Flags__\n";
        markdown += "| Long | Short | Description |\n";
        markdown += "| :--- | :---- | :---------- |\n";

        const allFlags = [...(doc.options || []), ...(doc.inherited_options || [])];
        markdown += allFlags.map(formatFlagAsTableRow).join('');

        markdown += "\n";
        return markdown;
    }).join('\n');
}

async function generateCliDocumentation() {
    try {
        const yamlDocuments = await fetchYamlDocuments();
        const markdownContent = convertYamlToMarkdown(yamlDocuments);
        const fullDocument = `${HEADER}\n${markdownContent}\n${FOOTER}`;

        console.log(`Writing documentation to '${OUTPUT_PATH}'...`);
        await fsPromises.writeFile(OUTPUT_PATH, fullDocument);
        console.log('Documentation generated successfully.');
    } catch (error) {
        console.error('Error generating documetation:', error);
    }
}

generateCliDocumentation();