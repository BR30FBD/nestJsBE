import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // ✅ Redirects to Google OAuth page (handled by passport-google)
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    const user = req.user;
    
    if (user?.accessToken) {
      // ✅ Redirect to Angular app with token as query param
      return res.redirect(`http://localhost:4200/login?token=${user.accessToken}`);
    } else {
      return res.redirect(`http://localhost:4200/login?error=invalid_token`);
    }
  }
}
