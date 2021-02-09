export class Paging{
    selectItemsPerPage: number[] = [ 5,10, 25,50,100];
    RowCount:any= this.selectItemsPerPage[4];
    Page:any=1
    allItemsLength = 0;
}