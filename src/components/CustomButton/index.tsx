

interface ICustomButton {
    text?: string;
    padding?: string;
    color?: string;
    backgroundColor?: string;
    fontSize?: string;    
    fontWeight?: string;
    icon?: string; 
    onClick?: () => void;
}


export const CustomButton: React.FC<ICustomButton> = ({
    text,
    padding,
    color,
    backgroundColor,
    fontSize, 
    fontWeight,
    icon,
    onClick
}) => {
    return (  
        <button className="custom-button" style={{ 
            padding,
            color,
            backgroundColor,
            fontSize, 
            fontWeight        
            }}
            onClick={onClick}
            >
            {text}
            {icon && <img src={icon}/>}
        </button>
    );
};

export default CustomButton;