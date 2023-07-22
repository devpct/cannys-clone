import { createContext , useState } from "react"

export const UsersDataContext = createContext()

const HomeContext = ({ children }) => {

    const [usersData, setUsersData] = useState([])

    return(
        <UsersDataContext.Provider value={[usersData, setUsersData]}>
            {children}
        </UsersDataContext.Provider>
    )
}

export default HomeContext

