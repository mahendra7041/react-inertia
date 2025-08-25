import { Router } from "express";

const router = new Router();

router.get("/", (req, res) => {
  return res.inertia.render("home");
});

router.get("/about", (req, res) => {
  return res.inertia.render("about");
});

export default router;
