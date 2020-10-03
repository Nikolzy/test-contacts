export default {
    state: {
        contacts: [],
        generalId: 1
    },
    mutations: {
        createContact (state, data) {
            state.contacts.push(data);
        },
        removeContact (state, id) {
            state.contacts = state.contacts.filter(user => user.id !== id);
        },
        updateUser (state, data) {
            state.contacts = state.contacts.map(user => {
                return user.id === data.id
                    ? data
                    : user
            })
        },
        setGeneralId (state, id) {
            state.generalId = id;
        }
    },
    getters: {
        getContacts: state => state.contacts,
        getGeneralId: state => state.generalId
    },
}