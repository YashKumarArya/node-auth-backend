
import { fetchHomepageData } from "./homepage.service.js";

export async function getHomepage(req, res, next) {
  try {
    const data = await fetchHomepageData();

    return res.status(200).json({
      ok: true,
      data,
    });
  } catch (err) {
    console.error("[Homepage:Get]", err);
    next(err);
  }
}
