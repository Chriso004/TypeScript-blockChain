import * as CryptoJS from "crypto-js";
import { createNew } from "typescript";

class Block {
    private index: number;
    private hash: string;
    private previousHash: string;
    private data: string;
    private timestamp: number;

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }

    static createBlockHash = (
        index: number,
        previousHash: string,
        data: string,
        timestamp: number,
    ): string => CryptoJS.SHA256(index, previousHash, timestamp, data).toString();

    static validateStructure = (block: Block): boolean =>
        typeof block.getIndex() === "number" &&
        typeof block.getPreviousHash() === "string" &&
        typeof block.getHash() === "string" &&
        typeof block.getData() === "string" &&
        typeof block.getTimestamp() === "number";

    public setIndex(index: number) { this.index = index; }
    public setHash(hash: string) { this.hash = hash; }
    public setPreviousHash(previousHash: string) { this.previousHash = previousHash; }
    public setData(data: string) { this.data = data; }
    public setTimestamp(timestamp: number) { this.timestamp = timestamp; }

    public getIndex() { return this.index; }
    public getHash() { return this.hash; }
    public getPreviousHash() { return this.previousHash; }
    public getData() { return this.data; }
    public getTimestamp() { return this.timestamp; }
};

const genesisBlock: Block = new Block(0, "20220216", "", "Hello World", 1);

let blockChain: [Block] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;

const getLastestBlock = (): Block => blockChain[blockChain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLastestBlock();
    const newIndex: number = previousBlock.getIndex() + 1;
    const newTimeStamp: number = getNewTimestamp();
    const previousHash: string = previousBlock.getHash();
    const newHash: string =
        Block.createBlockHash(
            newIndex,
            previousHash,
            data,
            newTimeStamp
        );
    const newBlock = new Block(newIndex, newHash, previousHash, data, newTimeStamp);
    addBlock(newBlock);
    
    return newBlock;
}

const getHashforBlock = (block: Block): string =>
    Block.createBlockHash(
        block.getIndex(),
        block.getPreviousHash(),
        block.getData(),
        block.getTimestamp()
    );

const isBlockValid = (candideateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candideateBlock)) return false;
    else if (previousBlock.getIndex() + 1 !== candideateBlock.getIndex())
        return false;
    else if (previousBlock.getHash() !== candideateBlock.getPreviousHash())
        return false;
    else if (getHashforBlock(candideateBlock) !== candideateBlock.getHash())
        return false;
    else
        return true;
}

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLastestBlock()))
        blockChain.push(candidateBlock);
}

createNewBlock("second");
createNewBlock("third");
createNewBlock("fourth");

console.log(getBlockChain());