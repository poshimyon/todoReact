import { Box, Typography } from "@mui/material";

export default function DashboardHeader() {
    return (
        <>
            <Typography variant="h4" align="center">
                ダッシュボード
            </Typography>

            <Typography variant="h6" align="center">
                TODO一覧
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    px: 2,
                    py: 1,
                    backgroundColor: "#eeeeee",
                    borderRadius: 1,
                }}
            >
                <Typography sx={{ width: "30%" }}>日付</Typography>
                <Typography sx={{ width: "40%", textAlign: "center" }}>
                    タイトル
                </Typography>
                <Typography sx={{ width: "30%", textAlign: "right" }}>
                    作成者
                </Typography>
            </Box>
        </>
    );
}
