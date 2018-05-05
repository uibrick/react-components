const modal = (state = {}, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                src: action.src,
                title: action.title,
                desc: action.desc
            };
        case 'CLOSE_MODAL':
            return {};
        default:
            return state;
    }
}

export default modal;