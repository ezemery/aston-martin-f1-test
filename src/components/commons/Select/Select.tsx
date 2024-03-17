import { Dispatch, SetStateAction, forwardRef, useState } from "react";

type SelectTypes = {
  data: any;
  label: string;
  value:string;
  fireEventChange: Dispatch<SetStateAction<string>>,
};

export const Select = forwardRef(({ data, label, value, fireEventChange }: SelectTypes, ref:React.LegacyRef<HTMLSelectElement>) =>  {
  const [selected, setSelected] = useState(data[0]);
  const changeListData = (e:any) => {
    if(label === "label"){
      fireEventChange(e.value)
      setSelected(e)
    }else{
      fireEventChange(e.season)
      setSelected(e)
    }
    console.log(e)
  }

  return (
    <>
    <select
      role="select"
      className="block w-full p-2 bg-gray-800 text-white rounded-md"
      onChange={changeListData}
      ref={ref}
    >
      {data.map((val: any, indx: number) => (
        <option key={indx} value={val[value]}>{val[label]}</option>
      ))}
    </select>
    </> 
  );
})
