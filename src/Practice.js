import {JoblyApi} from './JoblyApi'
import {useState, useEffect} from 'react'
// import { user } from '../../backend/db'


/** get a company */
// function Practice() {
//   let [company, setCompany] = useState(null)

//   useEffect(() => {
//     async function getCompany() {
//       const res = await JoblyApi.getCompany('anderson-arias-morrow');
//       console.log(res)
//       setCompany(res)
//     }
//     getCompany();
//   }, [setCompany])
//   return (
//     <div className="Practice">
//       <h1>{company ? company.name: 'loading...'}</h1>
//     </div>
//   );
// }

/** get all companies */
// function Practice() {
//   let [companies, setCompanies] = useState(null)

//   useEffect(() => {
//     async function getAllCompanies() {
//       const res = await JoblyApi.getAll('companies');
//       console.log(res)
//       setCompanies(res)
//     }
//     getAllCompanies();
//   }, [setCompanies])
//   return (
//     <div className="Practice">
//       <h1>{companies ? 'hi': 'loading...'}</h1>
//     </div>
//   );
// }

/** get a user */
function Practice() {
  let [user, setUser] = useState(null)
  let currUser = "testadmin"

  useEffect(() => {
    async function getUser() {
      const res = await JoblyApi.getUser(currUser);
      console.log(res)
      setUser(res)
    }
    getUser();
  }, [setUser, currUser])
  return (
    <div className="Practice">
      <h1>{user ? user.username : 'loading...'}</h1>
    </div>
  );
}

/** get all users NEED ADMIN TOKEN */
// function Practice() {
//   let [users, setUsers] = useState(null)

//   useEffect(() => {
//     async function getAllUsers() {
//       const res = await JoblyApi.getAll('users');
//       console.log(res.users)
//       setUsers(res.users)
//     }
//     getAllUsers();
//   }, [setUsers])
//   return (
//     <div className="Practice">
//       <h1>{users ? users[0].username: 'loading...'}</h1>
//     </div>
//   );
// }

/** apply to a job NEED ADMIN/USER TOKEN */
// function Practice() {
//   let [isApplied, setIsApplied] = useState(false)
//   let username = 'tdj'
//   let job = 200
//   useEffect(() => {
//     async function apply() {
//       const res = await JoblyApi.applyToJob('tdj', 2);
//       console.log(res)
//       setIsApplied(true)
//     }
//     apply();
//   }, [setIsApplied])
//   return (
//     <div className="Practice">
//       <h1>{isApplied ? `${username} applied to ${job}`: 'loading...'}</h1>
//     </div>
//   );
// }

export default Practice;

