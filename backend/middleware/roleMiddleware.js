// ===============================
// Role Middleware
// ===============================

export const authorize = (...roles) => {

  return (req, res, next) => {

    try {

      if (!req.user) {

        return res.status(401).json({
          success: false,
          message: "User not authenticated"
        });

      }


      if (!roles.includes(req.user.role)) {

        return res.status(403).json({
          success: false,
          message: "Access Denied. You are not authorized."
        });

      }


      next();


    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }

  };

};