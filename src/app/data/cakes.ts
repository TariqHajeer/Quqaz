import { environment } from 'src/environments/environment';
const adminRoot = environment.adminRoot;

export interface ICake {
  title: string;
  link: string;
}

const data: ICake[] = [
  {
    title: 'Marble Cake',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Fruitcake',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Chocolate Cake',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Fat Rascal',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Financier',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Genoise',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Gingerbread',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Goose Breast',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Parkin',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Salzburger Nockerl',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Soufflé',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Merveilleux',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Streuselkuchen',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Tea Loaf',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Napoleonshat',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Merveilleux',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Magdalena',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Cremeschnitte',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Cheesecake',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Bebinca',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Salzburger Nockerl',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Soufflé',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Merveilleux',
    link: `${adminRoot}/#`,
  },
  {
    title: 'Streuselkuchen',
    link: `${adminRoot}/#`,
  },
];

export default data;
