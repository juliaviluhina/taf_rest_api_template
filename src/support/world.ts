import { IWorldOptions, World } from '@cucumber/cucumber';
import { setWorldConstructor } from '@cucumber/cucumber';
import { ApiResponse } from '../services/base/apiResponse';

export interface CustomWorld extends World {
    storeData(key: string, data: any): void;
    retrieveData<T = any>(key: string): T;
    clearData(key: string): void;
    clearAllData(): void;
    storeResponse(apiResponse: ApiResponse<any>): void;
    retrieveResponse<T>(): ApiResponse<T>;
}

export class TafWorld extends World implements CustomWorld {
    private _dataStore: { [key: string]: any };
    private _apiResponse: ApiResponse<any>;

    constructor(options: IWorldOptions) {
        super(options);
    }

    /**
    * Store data in the global context
    * @param apiResponse - data to be stored, processed response taken from service method for calling rest api request
    */
    public storeResponse(apiResponse: ApiResponse<any>) {
        this._apiResponse = apiResponse;
    }

    /**
    * Retrieve data from the global context
    * @returns Stored data (processed response taken from service method for calling rest api request) or throws an error if not found
    */
    public retrieveResponse<T>(): ApiResponse<T> {
        if (!(this._apiResponse)) {
            throw new Error(`No response stored`);
        }
        return this._apiResponse as ApiResponse<T>;
    }

    /**
    * Store data in the global context
    * @param key - Unique identifier for the stored data
    * @param data - Data to be stored
    */
    public storeData(key: string, data: any): void {
        if (!key) {
            throw new Error('Storage key must be a non-empty string');
        }
        this._dataStore[key] = data;
    }

    /**
     * Retrieve data from the global context
     * @param key - Unique identifier for the stored data
     * @returns Stored data or throws an error if not found
     */
    public retrieveData<T = any>(key: string): T {
        if (!(key in this._dataStore)) {
            throw new Error(`No data found for key: ${key}`);
        }
        return this._dataStore[key] as T;
    }

    /**
     * Clear a specific key from the data store
     * @param key - Unique identifier to be cleared
     */
    public clearData(key: string): void {
        delete this._dataStore[key];
    }

    /**
     * Clear entire data store
     */
    public clearAllData(): void {
        this._dataStore = {};
    }

}

setWorldConstructor(TafWorld);