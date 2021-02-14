
export class Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
  ord: string;
  dir: string;

  public constructor(sortBy: string = 'id', direction: string = 'ASC') {
    this.ord = sortBy;
    this.dir = direction;
  }

}

export class Pageable {
  static readonly DEFAULT_PAGE_SIZE = 20;
  static readonly FIRST_PAGE_NUMBER = 0;
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;

  public constructor(pageNumber: number = Pageable.FIRST_PAGE_NUMBER, pageSize: number = Pageable.DEFAULT_PAGE_SIZE) {
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
  }
}

export class Page<T> {
  content: Array<T>;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  first: boolean;
  numberOfElements: number;
  sort: Sort;
  pageable: Pageable;

}

export class SortParms {
  ord: string;
  dir: string;

  public constructor(sortBy: string = 'nome', direction: string = 'ASC') {
    this.ord = sortBy;
    this.dir = direction;
  }

}
export class PaginationParms {
  static readonly DEFAULT_PAGE_SIZE = 10;
  static readonly FIRST_PAGE_NUMBER = 0;
  pageSize: number;
  pageNumber: number;

  public constructor(pageNumber: number = PaginationParms.FIRST_PAGE_NUMBER, pageSize: number = PaginationParms.DEFAULT_PAGE_SIZE) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }
}

export class PageParams {
  sort: SortParms;
  pagination: PaginationParms;
  filter: string;
  dataNascimento: string = "";
  sexo: string = "";

  public constructor(sort: SortParms = new SortParms(), pagination: PaginationParms = new PaginationParms(), filter: string = '') {
      this.sort = sort;
      this.pagination = pagination;
      this.filter = filter;
  }

}
