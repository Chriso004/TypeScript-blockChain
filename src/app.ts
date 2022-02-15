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
    ) 
    {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }

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