import React, { useState, useEffect } from "react";
import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
import { IconButton } from '@mui/material';
import { Icon } from '@iconify-icon/react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #0d0d0d;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .cmdk-dialog {
    background-color: #1c1c1c !important;
    color: #fff !important;
  }

  .cmdk-item,
  .cmdk-input,
  .cmdk-group {
    background-color: #1c1c1c !important;
    color: #fff !important;
  }

  .cmdk-input::placeholder {
    color: #aaa !important;
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const Main = styled.main`
  text-align: center;
  margin-top:10%;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 12%;
`;

const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
`;

const App = () => {
  const [page, setPage] = useState<"root" | "projects">("root");
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'k') {
        setOpen(true);
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredItems = filterItems(
    [
      {
        heading: "Home",
        id: "home",
        items: [
          {
            id: "home",
            children: "Home",
            icon: "HomeIcon",
            href: "#",
          },
          {
            id: "settings",
            children: "Settings",
            icon: "CogIcon",
            href: "#",
          },
          {
            id: "projects",
            children: "Projects",
            icon: "RectangleStackIcon",
            closeOnSelect: false,
            onClick: () => {
              setPage("projects");
            },
          },
        ],
      },
      {
        heading: "Other",
        id: "advanced",
        items: [
          {
            id: "developer-settings",
            children: "Developer settings",
            icon: "CodeBracketIcon",
            href: "#",
          },
          {
            id: "privacy-policy",
            children: "Privacy policy",
            icon: "LifebuoyIcon",
            href: "#",
          },
          {
            id: "log-out",
            children: "Log out",
            icon: "ArrowRightOnRectangleIcon",
            onClick: () => {
              alert("Logging out...");
            },
          },
        ],
      },
    ],
    search
  );

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <NavLinks>
          <StyledLink href="/">LX</StyledLink>
          </NavLinks>
          <NavLinks>
            <StyledLink href="/sobre">Sobre</StyledLink>
            <StyledLink href="/setup">Setup</StyledLink>
          </NavLinks>
          <IconButton onClick={() => setOpen(true)} style={{ color: '#fff' }}>
          <Icon icon="ri:command-line" />
            </IconButton>
        </Header>
        <Main>
          <h1>Lívia Xavier</h1>
          <h2>Sou desenvolvedora e UI/UX Designer</h2>
          <p>Desenvolvedor Front-end | UI Designer | HTML | CSS | JS | Back-end JAVA | Figma</p>

          <IconButton onClick={() => setOpen(true)} style={{ color: '#fff' }}>
          <p>Pressione <kbd>⌘</kbd>+<kbd>K</kbd> para iniciar</p>
          </IconButton>

 
        </Main>
        <Footer>
          <StyledLink href="https://github.com">github</StyledLink>
          <StyledLink href="https://linkedin.com">linkedin</StyledLink>
          <StyledLink href="https://instagram.com">instagram</StyledLink>
          <StyledLink href="https://instagram.com">instagram</StyledLink>
        </Footer>
        <CommandPalette
          onChangeSearch={setSearch}
          onChangeOpen={setOpen}
          search={search}
          isOpen={open}
          page={page}
        >
          <CommandPalette.Page id="root">
            {filteredItems.length ? (
              filteredItems.map((list) => (
                <CommandPalette.List key={list.id} heading={list.heading}>
                  {list.items.map(({ id, ...rest }) => (
                    <CommandPalette.ListItem
                      key={id}
                      index={getItemIndex(filteredItems, id)}
                      {...rest}
                    />
                  ))}
                </CommandPalette.List>
              ))
            ) : (
              <CommandPalette.FreeSearchAction />
            )}
          </CommandPalette.Page>

       
        </CommandPalette>
      </Container>
    </>
  );
};

export default App;
