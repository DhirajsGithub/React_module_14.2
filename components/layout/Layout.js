import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      {/* <h1>Demo</h1> */}
      {/* since Layout surrounds _app hence MainNavigation will be shown at top the other pages will be shown  */}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
