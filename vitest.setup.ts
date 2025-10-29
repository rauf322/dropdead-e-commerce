import { config } from 'dotenv';
import path from 'path';

// Load .env file from project root
config({ path: path.resolve(__dirname, '.env') });
