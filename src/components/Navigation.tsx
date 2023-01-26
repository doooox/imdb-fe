import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, Outlet } from "react-router-dom";
import { NAVIGATION_ROUTES, ROUTES, SITE } from "../utils/static";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchComponent";
import { UserContext } from "../context/UserContext";

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { user } = useContext(UserContext);

  const getAvailbleRoutes = () => {
    const routes = NAVIGATION_ROUTES.map((route) => {
      if (!user && route.perms.guestOnly) return route;
      if (user) {
        if (route.perms.requiredAuth && !route.perms.adminOnly) return route;
        if (user.isAdmin && route.perms.adminOnly) return route;
      }
    }).filter((route) => route);
    return routes;
  };

  return (
    <>
      <AppBar
        position="absolute"
        style={{
          background:
            "linear-gradient(16deg, rgba(37,37,37,1) 44%, rgba(92,91,91,1) 78%)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <PlayCircleFilledWhiteIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              style={{ color: "red", fontSize: "3rem" }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={ROUTES.MOVIES}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {SITE.name}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {getAvailbleRoutes()?.map(
                  (page) =>
                    page && (
                      <Button
                        key={page.name}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        <Link
                          to={page.path}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {page.name}
                        </Link>
                      </Button>
                    )
                )}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href={ROUTES.MOVIES}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {SITE.name}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {getAvailbleRoutes()?.map(
                (page) =>
                  page && (
                    <Button key={page.name} sx={{ my: 2, display: "block" }}>
                      <Link
                        to={page.path}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        {page.name}
                      </Link>
                    </Button>
                  )
              )}
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl" style={{ marginTop: "8rem" }}>
        <Outlet />
      </Container>
    </>
  );
};
export default Navigation;
