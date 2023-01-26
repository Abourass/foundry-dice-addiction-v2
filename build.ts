import fs from 'fs';
import archiver from 'archiver';

function buildPackage(){
  // We will start by getting the package.json
  const packageDeclaration = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  // We will start by copying the module.json file from the root directory to the src directory
  const moduleDeclaration: Record<string, any> = JSON.parse(fs.readFileSync('./module.json', 'utf-8'));

  // If we haven't updated the version in the module.json file, we will do it now
  if (moduleDeclaration.version !== packageDeclaration.version){
    moduleDeclaration.version = packageDeclaration.version;

    console.log(`Updated version to ${packageDeclaration.version}`);
    fs.writeFileSync('./module.json', JSON.stringify(moduleDeclaration, null, 2));
  }

  // We will copy our root module.json into the src directory
  fs.writeFileSync('./src/module.json', JSON.stringify(moduleDeclaration, null, 2));

  // We will then delete the dice-addiction.zip so we can create a new one
  if (fs.existsSync('./dice-addiction.zip')){
    fs.unlinkSync('./dice-addiction.zip');
  }

  // Then we will zip the src directory and rename it to dice-addiction.zip
  const output = fs.createWriteStream('./dice-addiction.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`Created dice-addiction.zip (${archive.pointer()} total bytes)`);
  });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      // throw error
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  archive.directory('./src/', false);

  archive.finalize();
}

buildPackage();
