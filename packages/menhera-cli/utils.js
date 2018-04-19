import dowloadRepo from "download-git-repo";
import fs from "fs-extra";
import chalk from "chalk";

export const download = (repo, desc, options) =>
  new Promise((res, rej) => {
    dowloadRepo(repo, desc, options, err => {
      err ? rej(err) : res(err);
    });
  });

export const forceDownload = async (repo, desc, options) => {
  let exists = await fs.exists(desc);
  if (exists) {
    await fs.remove(desc);
  }
  return await download(repo, desc, options);
};
