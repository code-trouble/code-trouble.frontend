

interface ICustomButton {
    text?: string;
    padding?: string;
    color?: string;
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