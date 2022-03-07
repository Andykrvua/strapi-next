import fs from 'fs';
import path from 'path';
import { Fetcher } from './fetch';

/**
 * Делаем один запрос и сохраняем данные в файл. При последующих запросах проверяем
 * файл, если данные есть запрос не делаем. Возможо не будет работать на unix из-за путей.
 * В закоментированных участках оригинальный код (flaviocopes.com/nextjs-cache-data-globally/)
 * @returns json
 */

async function fetchMembersData() {
  console.log('Fetching members data...');
  const nav = await Fetcher('navigations');
  return nav;
}

const MEMBERS_CACHE_PATH = path.resolve('.members');

export default async function getMembers() {
  let cachedData;

  try {
    cachedData = JSON.parse(
      // fs.readFileSync(path.join(__dirname, MEMBERS_CACHE_PATH), 'utf8')
      fs.readFileSync((__dirname, MEMBERS_CACHE_PATH), 'utf8')
    );
  } catch (error) {
    console.log('Member cache not initialized');
  }

  if (!cachedData) {
    const data = await fetchMembersData();
    try {
      fs.writeFileSync(
        // path.join(__dirname, MEMBERS_CACHE_PATH),
        (__dirname, MEMBERS_CACHE_PATH),
        JSON.stringify(data),
        'utf8'
      );
      console.log('Wrote to members cache');
    } catch (error) {
      console.log('ERROR WRITING MEMBERS CACHE TO FILE');
      console.log(error);
    }

    cachedData = data;
  }

  return cachedData;
}
