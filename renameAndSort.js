"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const random_words_1 = __importDefault(require("random-words"));
const generateRandomName = () => {
    const randWords = (0, random_words_1.default)({ exactly: 2, wordsPerString: 3, separator: ' ' })[0];
    const pascalCaseWords = randWords.split(' ')
        .map(e => e.slice(0, 1).toUpperCase().concat(e.slice(1))).join('');
    // Convert to camelCase and return
    return pascalCaseWords.slice(0, 1).toLowerCase().concat(pascalCaseWords.slice(1));
};
(async () => {
    const files = await (0, promises_1.readdir)('./rename');
    const filesMoved = await Promise.all(files.map(async (fileName, index) => {
        const fileNamePrefix = generateRandomName();
        const fileNameExtension = fileName.split('.').pop();
        const fileStream = await (0, promises_1.readFile)(`./rename/${fileName}`);
        await (0, promises_1.writeFile)(`./assets/textures/${fileNamePrefix}.${fileNameExtension}`, fileStream);
        await (0, promises_1.unlink)(`./rename/${fileName}`);
        return `${fileNamePrefix}.${fileNameExtension}`;
    }));
    console.log(`Finished renaming and sorting ${filesMoved.length} files.`);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuYW1lQW5kU29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbmFtZUFuZFNvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwQ0FBa0U7QUFDbEUsZ0VBQXNDO0FBRXRDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE1BQU0sU0FBUyxHQUFHLElBQUEsc0JBQVcsRUFBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRixNQUFNLGVBQWUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUMzQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2pFLGtDQUFrQztJQUNsQyxPQUFPLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkYsQ0FBQyxDQUFBO0FBRUQsQ0FBQyxLQUFLLElBQUcsRUFBRTtJQUNULE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBQSxrQkFBTyxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXhDLE1BQU0sVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDdkUsTUFBTSxjQUFjLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QyxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDcEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFBLG1CQUFRLEVBQUMsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRTFELE1BQU0sSUFBQSxvQkFBUyxFQUFDLHFCQUFxQixjQUFjLElBQUksaUJBQWlCLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4RixNQUFNLElBQUEsaUJBQU0sRUFBQyxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDckMsT0FBTyxHQUFHLGNBQWMsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxVQUFVLENBQUMsTUFBTSxTQUFTLENBQUMsQ0FBQTtBQUMxRSxDQUFDLENBQUMsRUFBRSxDQUFBIn0=