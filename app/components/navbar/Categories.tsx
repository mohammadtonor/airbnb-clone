import Container from "../Container";

import { TbBeach } from 'react-icons/tb'
import { GiWindmill } from 'react-icons/gi'
import CategoryBox from "../CategoryBox";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach'
    },
    {
        label: 'Windmils',
        icon: GiWindmill,
        description: 'This property is close to the beach'
    },
    {
        label: 'Modern',
        icon: GiWindmill,
        description: 'This property is close to the beach'
    }

]

const Categories = () => {

    return (
        <div
           className="
            pt-4 
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto
          "
        >
            {categories.map((item) => (
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    description={item.description}
                    icon={item.icon}
                />
            ))}
        </div>
    );
}
 
export default Categories;