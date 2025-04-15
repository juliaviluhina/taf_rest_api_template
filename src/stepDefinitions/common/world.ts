import { setWorldConstructor, World } from '@cucumber/cucumber';

/**
 * Custom World class to manage global state across step definitions
 */
class CustomWorld extends World {
  // Private static property to ensure thread-safety and singleton-like behavior
  private static _dataStore: { [key: string]: any } = {};

  /**
   * Store data in the global context
   * @param key - Unique identifier for the stored data
   * @param data - Data to be stored
   */
  storeData(key: string, data: any): void {
    if (!key) {
      throw new Error('Storage key must be a non-empty string');
    }
    CustomWorld._dataStore[key] = data;
  }

  /**
   * Retrieve data from the global context
   * @param key - Unique identifier for the stored data
   * @returns Stored data or throws an error if not found
   */
  retrieveData<T = any>(key: string): T {
    if (!(key in CustomWorld._dataStore)) {
      throw new Error(`No data found for key: ${key}`);
    }
    return CustomWorld._dataStore[key] as T;
  }

  /**
   * Clear a specific key from the data store
   * @param key - Unique identifier to be cleared
   */
  clearData(key: string): void {
    delete CustomWorld._dataStore[key];
  }

  /**
   * Clear entire data store
   */
  clearAllData(): void {
    CustomWorld._dataStore = {};
  }
}

// Set the custom world constructor for Cucumber
setWorldConstructor(CustomWorld);

export = CustomWorld;
