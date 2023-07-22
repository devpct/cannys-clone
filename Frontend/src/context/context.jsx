import HomeContext from './home/HomeContext'

const Context = ({ children }) => {    
    
    return(
      <HomeContext>
        {children}
      </HomeContext>
    )

}

export default Context