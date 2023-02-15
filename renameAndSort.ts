import { readdir, writeFile, readFile, unlink } from 'fs/promises'
import randomWords from 'random-words'

const generateRandomName = () => {
  const randWords = randomWords({ exactly: 2, wordsPerString: 2, separator: ' ' })[0];
  const pascalCaseWords = randWords.split(' ')
  .map(e => e.slice(0,1).toUpperCase().concat(e.slice(1))).join('')
  // Convert to camelCase and return
  return pascalCaseWords.slice(0,1).toLowerCase().concat(pascalCaseWords.slice(1));
}

(async() => {
  const files = await readdir('./rename'); 

  const filesMoved = await Promise.all(files.map(async (fileName, index) => {
    const fileNamePrefix = generateRandomName();
    const fileNameExtension = fileName.split('.').pop();
    const fileStream = await readFile(`./rename/${fileName}`);

    await writeFile(`./assets/textures/${fileNamePrefix}.${fileNameExtension}`, fileStream);
    await unlink(`./rename/${fileName}`);
    return `${fileNamePrefix}.${fileNameExtension}`;
  }));

  console.log(`Finished renaming and sorting ${filesMoved.length} files.`)
})()
