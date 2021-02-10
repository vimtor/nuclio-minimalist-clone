import {useContext} from "react";
import {AuthContext} from "../contexts/auth-context";
import {ListsContext} from "../contexts/lists-context";

const useLists = () => {
    const context = useContext(ListsContext)
    if (!context) {
        throw Error('The hook useLists must be used within ListsProvider')
    }
    return context
}

export default useLists
