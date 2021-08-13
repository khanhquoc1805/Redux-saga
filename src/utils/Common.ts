export const capitalizeString = (str: string) => {
    if(!str) return '';
    return `${str[0].toUpperCase()}${str.slice(1)}`;

}

export const getColor = (mark: number): string => {
    if(mark === 10) return "violet";
    if(mark >= 8) return "green";
    if(mark<= 4 ) return "red";
    return "goldenrod"

}