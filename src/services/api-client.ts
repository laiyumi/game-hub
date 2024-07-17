// A axios instance with custom configuration
import axios from "axios";

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key:'477edb6a79d44d18a87f9677bc282d11'
    }
}
)