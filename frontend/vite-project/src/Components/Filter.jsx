import { Select, Input } from '@chakra-ui/react';
export default function Fiter({filter,setFilter}){
    return (
        <div>
        <Input placeHolder = "Search"   value={filter.search}  onChange={(e) => setFilter({...filter,search: e.target.value})}/>
        <Select onChange={(e) => setFilter({...filter,sortOrder: e.target.value})}> 
          <option value={"desc"}>New</option>
          <option value={"asc"}>Old</option>
        </Select>
      </div>
    );
}