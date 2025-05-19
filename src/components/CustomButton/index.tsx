

interface ICustomButton {
    text?: string;
    padding?: string;
    color?: string;
    borderRadius?: string;
    border?: string;
    backgroundColor?: string;
    fontSize?: string;    
    fontWeight?: string;
    icon?: string; 
    onClick?: () => void;
    customId?: string;
}


export const CustomButton: React.FC<ICustomButton> = ({
    text,
    padding,
    color,
    borderRadius,
    border,
    backgroundColor,
    fontSize, 
    fontWeight,
    icon,
    onClick,
    customId
}) => {
    return (  
        <button className="custom-button" id={customId} style={{ 
            padding,
            color,
            backgroundColor,
            fontSize, 
            fontWeight,
            border,
            borderRadius        
            }}
            onClick={onClick}
            >
            {text}
            {icon && <img src={icon}  alt="generic icon for a button"/>}
        </button>
    );
};

export default CustomButton;