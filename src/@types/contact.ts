export type IContact = {
    fullName?:    string;
    phoneNumber?: string | number;
    email?:       string;
    note?:        string;
    attach_url?:  any;
}

export type ContactState = {
    contactList:IContact[]
    countContact: number;
}