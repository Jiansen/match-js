const match = obj => pattern => {
    if (obj in pattern){
        return pattern[obj];
    }
}

export default match;
