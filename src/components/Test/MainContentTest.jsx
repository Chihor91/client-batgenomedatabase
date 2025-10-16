import * as React from "react";
import Box from "@mui/material/Box";
import OuterBox from "../Custom/OuterBox";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const SIDEBAR_WIDTH = 40; // adjust to match your sidebar

export default function MainContent() {
  return (
    // <Box
    //   component="main"
    //   sx={{
    //     flexGrow: 1,
    //     bgcolor: "background.default",
    //     p: 3,
    //     marginLeft: 4,
    //     whiteSpace: "normal",
    //     wordBreak: "break-word",
    //     overflowWrap: "anywhere",
    //   }}
    // >
    //   <Toolbar />
    //   <Typography
    //     sx={{
    //       marginBottom: 2,
    //       whiteSpace: "normal",
    //       overflowWrap: "anywhere",
    //       wordBreak: "break-word",
    //       hyphens: "auto",
    //     }}
    //   >
    //     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    //     tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
    //     non enim praesent elementum facilisis leo vel. Risus at ultrices mi
    //     tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
    //     tellus. Convallis convallis tellus id interdum velit laoreet id donec
    //     ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
    //     suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
    //     quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
    //     proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
    //     tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
    //     varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
    //     Lorem donec massa sapien faucibus et molestie ac.
    //   </Typography>
    //   <Typography
    //     sx={{
    //       marginBottom: 2,
    //       whiteSpace: "normal",
    //       overflowWrap: "anywhere",
    //       wordBreak: "break-word",
    //       hyphens: "auto",
    //     }}
    //   >
    //     Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
    //     ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
    //     integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
    //     lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
    //     Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
    //     vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
    //     accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
    //     Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
    //     senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
    //     Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
    //     maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
    //     aliquam ultrices sagittis orci a.
    //   </Typography>
    // </Box>
    // <div className="h-[95vh]">
    //   <div className="pl-10 flex flex-col bg-home bg-fixed text-white w-full lg:p-0 h-[60%] justify-center">
    //     <Typography
    //       sx={{
    //         marginBottom: 2,
    //         whiteSpace: "normal",
    //         overflowWrap: "anywhere",
    //         wordBreak: "break-word",
    //         hyphens: "auto",
    //       }}
    //     >
    //       Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
    //       ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
    //       elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
    //       sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
    //       mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
    //       risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
    //       purus viverra accumsan in. In hendrerit gravida rutrum quisque non
    //       tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
    //       morbi tristique senectus et. Adipiscing elit duis tristique
    //       sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
    //       eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
    //       posuere sollicitudin aliquam ultrices sagittis orci a.
    //     </Typography>
    //   </div>
    // </div>
    // <div
    //   style={{
    //     marginLeft: SIDEBAR_WIDTH,
    //     // width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    //     width: "calc(100% - 100px)",
    //   }}
    //   className="p-6"
    // >
    <OuterBox>
      <Typography
        sx={{
          marginBottom: 2,
          padding: 3,
          display: "block",
          whiteSpace: "normal",
          overflowWrap: "anywhere",
          wordBreak: "break-word",
          hyphens: "auto",
        }}
      >
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
      {/* </div> */}
    </OuterBox>
  );
}
