import { BreadCrumbConteiner, BreadCrumbItem } from './BreadCrumb.styled';

interface BreadCrumbProps {
    selected: string;
    items: string[];
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ items, selected }) => {
    return (
        <BreadCrumbConteiner>
            {items.map((item, index) => (
                <BreadCrumbItem key={index} isSelected={item === selected}>
                    {item}
                </BreadCrumbItem>
            ))}
        </BreadCrumbConteiner>
    );
};
