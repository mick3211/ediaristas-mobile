import {
    PageSubtitleTitleStyled,
    PageTitleContainer,
    PageTitleStyled,
} from './PageTitle.styled';

interface PageTitleProps {
    title: string;
    subtitle?: string | JSX.Element;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
    return (
        <PageTitleContainer>
            <PageTitleStyled>{title}</PageTitleStyled>
            {subtitle && (
                <PageSubtitleTitleStyled>{subtitle}</PageSubtitleTitleStyled>
            )}
        </PageTitleContainer>
    );
};
