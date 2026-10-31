# Run from the repository root. The source stays unchanged for provenance.
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
public static class SolarAssets {
  public static void Build(string root) {
    using (var source = new Bitmap(root + "/assets/solar-sdo.jpg"))
    using (var graded = new Bitmap(1024, 1024)) {
      var masks = new Bitmap[3];
      for (int i=0;i<3;i++) masks[i]=new Bitmap(1024,1024);
      double[] cx={.78,.13,.66}, cy={.36,.43,.65};
      for(int y=0;y<1024;y++) for(int x=0;x<1024;x++) {
        var c=source.GetPixel(x,y);
        double r=c.R/255.0,g=c.G/255.0,b=c.B/255.0;
        double l=.2126*r+.7152*g+.0722*b;
        // Lift midtones without crushing the real filament contrast.
        double hot=Math.Pow(l,3);
        int rr=(int)(255*Math.Min(1,Math.Pow(r,.60)));
        int gg=(int)(255*Math.Min(1,Math.Pow(g,.72)));
        int bb=(int)(255*Math.Min(1,Math.Pow(b,.65)+.52*hot));
        // Fade the source caption and square corners; retain irregular corona.
        double dx=x/1023.0-.5,dy=y/1023.0-.5;
        double edge=Math.Max(0,Math.Min(1,(.48-Math.Sqrt(dx*dx+dy*dy))/.035));
        edge *= Math.Max(0,Math.Min(1,(.95-y/1023.0)/.025));
        graded.SetPixel(x,y,Color.FromArgb((int)(rr*edge),(int)(gg*edge),(int)(bb*edge)));
        for(int i=0;i<3;i++) {
          double u=(x/1023.0-cx[i])/.14,v=(y/1023.0-cy[i])/.16;
          double region=Math.Exp(-2*(u*u+v*v));
          double light=Math.Pow(Math.Max(0,(l-.12)/.88),1.4);
          int alpha=(int)(255*Math.Min(1,light*region*edge));
          masks[i].SetPixel(x,y,Color.FromArgb(alpha,255,255,255));
        }
      }
      graded.Save(root+"/assets/solar-surface.jpg",ImageFormat.Jpeg);
      for(int i=0;i<3;i++) { masks[i].Save(root+"/assets/solar-mask-"+i+".png",ImageFormat.Png); masks[i].Dispose(); }
    }
  }
}
'@
[SolarAssets]::Build((Get-Location).Path)

