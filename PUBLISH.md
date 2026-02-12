# How to Publish Your Valentine's Site on GitHub

Your site will only appear at **https://jose-ido.github.io/valentines-day/** after you turn on GitHub Pages and set it to use the workflow.

## Step 1: Open your repo

Go to: **https://github.com/Jose-IDO/valentines-day**

## Step 2: Open Pages settings

- Click **Settings** (tab at the top of the repo).
- In the left sidebar, under **“Code and automation”**, click **Pages**.

Or go directly: **https://github.com/Jose-IDO/valentines-day/settings/pages**

## Step 3: Set the source to GitHub Actions

- Under **“Build and deployment”**:
  - **Source:** choose **“GitHub Actions”** (not “Deploy from a branch”).
- You don’t need to change anything else. Save if there’s a button.

## Step 4: Run the workflow (if it hasn’t run yet)

- Click the **Actions** tab: **https://github.com/Jose-IDO/valentines-day/actions**
- You should see a workflow run named **“Deploy to GitHub Pages”** (from your last push).
- Click it. If it says **“This workflow has not been run yet”**, push any small change to `master` (or run the workflow manually if you have that option).
- Wait until the run shows a green checkmark (about 1–2 minutes).

## Step 5: Open your site

After the workflow succeeds, open:

**https://jose-ido.github.io/valentines-day/**

If it’s the first time, it can take 1–2 extra minutes. If you get 404, wait a bit and try again, or double-check that **Source** is **GitHub Actions** in Settings → Pages.

---

## If Actions says “No runners configured”

That usually means GitHub Actions isn’t allowed to use runners yet. Fix it like this:

### If this is your personal repo (github.com/Jose-IDO)

1. In the repo, go to **Settings** → **Actions** → **General**  
   (or: **https://github.com/Jose-IDO/valentines-day/settings/actions**)
2. Under **“Actions permissions”**, choose **“Allow all actions and reusable workflows”**.
3. Click **Save**.
4. Go to the **Actions** tab, open **“Deploy to GitHub Pages”** in the left sidebar, then click **“Run workflow”** (green button) → **“Run workflow”** again.  
   After a minute or two you should see a run using the **ubuntu-latest** runner.

### If the repo is under an organization

An **organization admin** has to allow runners:

1. Open the **organization** (not the repo): **https://github.com/organizations/Jose-IDO** (or whatever the org name is).
2. Go to **Settings** → **Actions** → **General**.
3. Under **“Runner selection”** (or “Policies”):
   - Either turn **on** **“GitHub-hosted runners”** so workflows can use `ubuntu-latest`,  
   - Or add a **self-hosted runner** and then your workflow can use it (we’d need to change the workflow to use that runner).
4. Save. Then in the repo, go to **Actions** → **“Deploy to GitHub Pages”** → **Run workflow**.

### After runners are fixed

- Run the workflow once (push a commit or **Actions** → **Deploy to GitHub Pages** → **Run workflow**).
- In **Settings** → **Pages**, set **Source** to **GitHub Actions**.
- Your site will be at: **https://jose-ido.github.io/valentines-day/**

---

**Summary:** The build runs in GitHub Actions. For the site to be “published”, Pages must use **GitHub Actions** as the source in **Settings → Pages**. If you see “no runners configured”, enable Actions (and org runners if needed) as above.
