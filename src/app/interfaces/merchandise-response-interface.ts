export interface MerchandiseReponse {
    content?:          Content[];
    pageable?:         Pageable;
    last?:             boolean;
    totalPages?:       number;
    totalElements?:    number;
    size?:             number;
    number?:           number;
    sort?:             Sort;
    first?:            boolean;
    numberOfElements?: number;
    empty?:            boolean;
}

export interface Content {
    id?:           number;
    productName?:  string;
    quantity?:     number;
    entryDate?:    Date;
    registeredBy: EdBy;
    editedBy?:     EdBy | null;
    editDate?:     Date | null;
    [key: string]: any;

}

export interface EdBy {
    id?:       number;
    name?:     string;
    age?:      number;
    position?: Position;
    joinDate?: Date;
}

export interface Position {
    idPosition?: number;
    jobTitle?:   string;
}

export interface Pageable {
    pageNumber?: number;
    pageSize?:   number;
    sort?:       Sort;
    offset?:     number;
    paged?:      boolean;
    unpaged?:    boolean;
}

export interface Sort {
    empty?:    boolean;
    sorted?:   boolean;
    unsorted?: boolean;
}
