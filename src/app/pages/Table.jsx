import React from 'react';
import { MDBDataTableV5, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

export default function TopSearch(userFromApi) {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Profile Pic',
        field: 'profile_pic',
        width: 150,
        sort: 'disabled',
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'profile_pic',
        },
      },
      {
        label: 'FirstName',
        field: 'firstName',
        width: 150,
      },
      {
        label: 'LastName',
        field: 'lastName',
        width: 200,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Country Code',
        field: 'countryCode',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'Phone Number',
        field: 'phoneNumber',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Referral Name',
        field: 'referralCode',
        sort: 'disabled',
        width: 100,
      },
      {
        label: 'Action',
        // field: 'salary',
        sort: 'disabled',
        width: 100,
      },
    ],
    rows: [
      {
        profile_pic: 'img',
        firstName: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        countryCode: '61',
        date: '2011/04/25',
        salary: '$320',
      },
      {
        profile_pic: 'img',
        firstName: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        countryCode: '63',
        date: '2011/07/25',
        salary: '$170',
      },
      {
        profile_pic: 'img',
        firstName: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        countryCode: '66',
        date: '2009/01/12',
        salary: '$86',
      },
      {
        profile_pic: 'img',
        firstName: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        countryCode: '22',
        date: '2012/03/29',
        salary: '$433',
      },
      {
        profile_pic: 'img',
        firstName: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        countryCode: '33',
        date: '2008/11/28',
        salary: '$162',
      },
      {
        profile_pic: 'img',
        firstName: 'Brielle Williamson',
        position: 'Integration Specialist',
        office: 'New York',
        countryCode: '61',
        date: '2012/12/02',
        salary: '$372',
      },
      {
        profile_pic: 'img',
        firstName: 'Herrod Chandler',
        position: 'Sales Assistant',
        office: 'San Francisco',
        countryCode: '59',
        date: '2012/08/06',
        salary: '$137',
      },
      {
        profile_pic: 'img',
        firstName: 'Rhona Davidson',
        position: 'Integration Specialist',
        office: 'Tokyo',
        countryCode: '55',
        date: '2010/10/14',
        salary: '$327',
      },
      {
        profile_pic: 'img',
        firstName: 'Colleen Hurst',
        position: 'Javascript Developer',
        office: 'San Francisco',
        countryCode: '39',
        date: '2009/09/15',
        salary: '$205',
      },
      {
        profile_pic: 'img',
        firstName: 'Sonya Frost',
        position: 'Software Engineer',
        office: 'Edinburgh',
        countryCode: '23',
        date: '2008/12/13',
        salary: '$103',
      },
      {
        profile_pic: 'img',
        firstName: 'Jena Gaines',
        position: 'Office MancountryCoder',
        office: 'London',
        countryCode: '30',
        date: '2008/12/19',
        salary: '$90',
      },
      {
        profile_pic: 'img',
        firstName: 'Quinn Flynn',
        position: 'Support Lead',
        office: 'Edinburgh',
        countryCode: '22',
        date: '2013/03/03',
        salary: '$342',
      },
      {
        profile_pic: 'img',
        firstName: 'Charde Marshall',
        position: 'Regional Director',
        office: 'San Francisco',
        countryCode: '36',
        date: '2008/10/16',
        salary: '$470',
      },
      {
        profile_pic: 'img',
        firstName: 'Haley Kennedy',
        position: 'Senior Marketing Designer',
        office: 'London',
        countryCode: '43',
        date: '2012/12/18',
        salary: '$313',
      },
      {
        profile_pic: 'img',
        firstName: 'Tatyana Fitzpatrick',
        position: 'Regional Director',
        office: 'London',
        countryCode: '19',
        date: '2010/03/17',
        salary: '$385',
      },
      {
        profile_pic: 'img',
        firstName: 'Michael Silva',
        position: 'Marketing Designer',
        office: 'London',
        countryCode: '66',
        date: '2012/11/27',
        salary: '$198',
      },
      {
        profile_pic: 'img',
        firstName: 'Paul Byrd',
        position: 'Chief Financial Officer (CFO)',
        office: 'New York',
        countryCode: '64',
        date: '2010/06/09',
        salary: '$725',
      },
      {
        profile_pic: 'img',
        firstName: 'Gloria Little',
        position: 'Systems Administrator',
        office: 'New York',
        countryCode: '59',
        date: '2009/04/10',
        salary: '$237',
      },
      {
        profile_pic: 'img',
        firstName: 'Bradley Greer',
        position: 'Software Engineer',
        office: 'London',
        countryCode: '41',
        date: '2012/10/13',
        salary: '$132',
      },
      {
        profile_pic: 'img',
        firstName: 'Dai Rios',
        position: 'Personnel Lead',
        office: 'Edinburgh',
        countryCode: '35',
        date: '2012/09/26',
        salary: '$217',
      },
      {
        profile_pic: 'img',
        firstName: 'Jenette Caldwell',
        position: 'Development Lead',
        office: 'New York',
        countryCode: '30',
        date: '2011/09/03',
        salary: '$345',
      },
      {
        profile_pic: 'img',
        firstName: 'Yuri Berry',
        position: 'Chief Marketing Officer (CMO)',
        office: 'New York',
        countryCode: '40',
        date: '2009/06/25',
        salary: '$675',
      },
      {
        profile_pic: 'img',
        firstName: 'Caesar Vance',
        position: 'Pre-Sales Support',
        office: 'New York',
        countryCode: '21',
        date: '2011/12/12',
        salary: '$106',
      },
      {
        profile_pic: 'img',
        firstName: 'Doris Wilder',
        position: 'Sales Assistant',
        office: 'Sidney',
        countryCode: '23',
        date: '2010/09/20',
        salary: '$85',
      },
      {
        profile_pic: 'img',
        firstName: 'Angelica Ramos',
        position: 'Chief Executive Officer (CEO)',
        office: 'London',
        countryCode: '47',
        date: '2009/10/09',
        salary: '$1',
      },
      {
        profile_pic: 'img',
        firstName: 'Gavin Joyce',
        position: 'Developer',
        office: 'Edinburgh',
        countryCode: '42',
        date: '2010/12/22',
        salary: '$92',
      },
      {
        profile_pic: 'img',
        firstName: 'Jennifer Chang',
        position: 'Regional Director',
        office: 'Singapore',
        countryCode: '28',
        date: '2010/11/14',
        salary: '$357',
      },
      {
        profile_pic: 'img',
        firstName: 'Brenden Wagner',
        position: 'Software Engineer',
        office: 'San Francisco',
        countryCode: '28',
        date: '2011/06/07',
        salary: '$206',
      },
      {
        profile_pic: 'img',
        firstName: 'Fiona Green',
        position: 'Chief Operating Officer (COO)',
        office: 'San Francisco',
        countryCode: '48',
        date: '2010/03/11',
        salary: '$850',
      },
      {
        profile_pic: 'img',
        firstName: 'Shou Itou',
        position: 'Regional Marketing',
        office: 'Tokyo',
        countryCode: '20',
        date: '2011/08/14',
        salary: '$163',
      },


    ],
  });


  return <MDBDataTableV5 hover scrollX scrollY maxHeight="40vh" entriesOptions={[5, 20, 25]} entries={5} pcountryCodesAmount={4} data={datatable} searchTop searchBottom={false} />;
}